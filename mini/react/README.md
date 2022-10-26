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
const element = React.createElement('h1', { title: 'foo' }, 'Hello');

//再转
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
