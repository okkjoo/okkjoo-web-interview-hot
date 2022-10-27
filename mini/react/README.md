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
