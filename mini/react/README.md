> 我们将一点点按照真实的 React 架构重写 React，同时忽略一些优化和不重要的功能。
> 本文基础部分基于 [build your own React](https://pomb.us/build-your-own-react/)

## 基础的基础

### JSX -> JS

```jsx
const element = <h1 title='foo'>Hello</h1>;
```

一个 JSX 其实就是一个带有 type 和 props 属性或者更多属性的对象

像上面的 JSX 大概就是转换为如此：

```js
// babel 转换为这样
const element = React.createElement('h1', { title: 'foo' }, 'Hello');

// createElement 返回的结果
const element = {
	type: 'h1',
	props: {
		title: 'foo',
		children: 'Hello',
	},
};
```

### render 效果

```jsx
const container = document.getElementById('root');
ReactDOM.render(element, container);
```

转为

```js
const node = document.createElement(element.type);
node['title'] = element.props.title;
//...
container.appendChild(node);
```

## 开始做自己的 React

```js
export default function createElement(type, props, ...children) {
	return {
		type,
		props: {
			...props,
			children: children.map(child =>
				typeof child === 'object' ? child : createTextElement(child)
			),
		},
	};
}

/**
 *
 * @param {string | number} text 基本只
 * @returns 包裹为 type 为特殊类型 TEXT_ELEMENT 的JS对象
 */
function createTextElement(text) {
	return {
		type: 'TEXT_ELEMENT',
		props: {
			nodeValue: text,
			children: {},
		},
	};
}
```

### 小知识：如何让 Babel 把 jsx 转换为 自己的 React.createElement

这里我给自己的 mini-react 取名为 Reactz

所以你可以这样 Babel

```jsx
/** @jsx Reactz.createElement */
const element = (
	<div id='foo'>
		<a>bar</a>
		<b />
	</div>
);
```

这样 Babel 就会把 JSX 编译为 Reactz.createElement

> 但是我是懒狗，连 Babel 都不想搞，直接用 Babel 转之后的代码了，反正这个不是重点辣

### createElement render 代码 & 效果

#### 代码

```js
/* createElement */
function createElement(type, props, ...children) {
	return {
		type,
		props: {
			...props,
			children: children.map(child =>
				typeof child === 'object' ? child : createTextElement(child)
			),
		},
	};
}

/**
 *
 * @param {string | number} text 基本值
 * @returns 包裹为 type 为特殊类型 TEXT_ELEMENT 的JS对象
 */
function createTextElement(text) {
	return {
		type: 'TEXT_ELEMENT',
		props: {
			nodeValue: text,
			children: [],
		},
	};
}

/* ReactDOM.render  */
function render(element, container) {
	//根据 element.type 属性创建 DOM 节点
	const dom =
		element.type === 'TEXT_ELEMENT'
			? document.createTextNode('') //特殊处理 text 节点
			: document.createElement(element.type);

	// element props 给到 dom 除了 children
	const isProperty = key => key !== 'children';
	Object.keys(element.props)
		.filter(isProperty)
		.forEach(name => {
			dom[name] = element.props[name];
		});
	//递归处理子节点
	element.props.children.forEach(child => render(child, dom));
	console.log('!', element.props);
	//将节点加入容器中
	container.appendChild(dom);
}
```

#### 测试代码：

````js
//这里我们省去 Babel 编译的这一步，因为懒得安装了
/*
    ```jsx
    const element = (
      <div style="background: salmon">
        <h1>Hello World</h1>
        <h2 style="text-align:right">from Didact</h2>
      </div>
    );
    ```
    */
const element = /*#__PURE__*/ Reactz.createElement(
	'div',
	{
		style: 'background: blue; ',
	},
	/*#__PURE__*/
	Reactz.createElement('h1', null, 'Hello World'),
	/*#__PURE__*/
	Reactz.createElement(
		'h2',
		{
			style: 'text-align:right',
		},
		'from Reactz'!
	)
);

const container = document.getElementById('root');
Reactz.render(element, container);
````

效果：

[1666862503741](image/README/1666862503741.png)

## 并发处理

前面已经完成了 JSX 到 DOM 的过程，但是还有一些问题，比如递归处理子节点的地方

```js
element.props.children.forEach(child => render(child, dom));
```

这也是 React 16 之前的问题，一旦开始递归处理，那么在整棵树处理完之前是无法退出的。

这会阻塞主线程很长时间，会带来卡顿的体验，无法给一些高优先级的任务让出时间。

> 高优先级的任务： 用户的输入、点击等操作，动画效果

所以要有一个办法来使得整个任务可以分为多个小块，处理一部分之后先把操作权归还浏览器，让浏览器处理高优先级的任务

> 总体的处理时间是没有变化的，但是体验却好了很多

这里要用到一个浏览器的 API [`requestIdleCallback `](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)，这个方法简单来说就是接收一个回调参数，但是他什么时候执行并不是由你来控制的。而是在浏览器空闲的时候调用。（更多语法详情可以看 MDN ）

> React 并不是用 `requestIdleCallback` 的。
> 它使用自己编写的 [`scheduler package`](https://github.com/facebook/react/tree/main/packages/scheduler) 但两者的效果差不多

> scheduler
> This is a package for cooperative scheduling in a browser environment. It is currently used internally by React, but we plan to make it more generic.
> 这是一个用于浏览器环境中的协作调度的包。它目前在 React 内部使用，但我们计划让它更通用。

## Fiber 数据结构

这个数据结构存在的意义就是为了将所有的任务单元组合起来

每一个 element 都是一个 fiber ，每一个 fiber 都是一个任务单元

每个 fiber 节点主要做三件事：

1. 把 element 添加到 DOM 上
2. 为 fiber 节点的子节点新建 fiber
3. 挑出下一个任务单元

至于怎么找 —— 基础就是他要有三个指针分别指向第一个子节点 child、下一个兄弟节点 sibling、父节点 parent(源码里好像是 return)

一般是先找子节点、没有就兄弟、再没有就去 **父节点的兄弟**，也就是叔叔节点、都没了一直往上，回到 根节点就说明完成了整个树的 render

### 注意区分三个不同的节点实体

#### element

通过 React.createElement 创建的 react element

#### DOM node

通过 React.createDom 中调用 document.createElement 最终生成的 DOM 节点

#### fiber node

就是从 element 到 DOM node 的中间产物，就是用来方便时间切片的
