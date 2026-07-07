## HTML基础

超文本标记语言（**H**yper **T**ext **M**arkup **L**anguage，HTML）是用来描述网页的一种语言。HTML 不是一种编程语言，而是一种<u>标记</u>语言。标记语言是一套标记标签，使用标记标签来描述网页。

一个 HTML 标签是由尖括号包围的关键词，比如 `<html>`。它通常是成对出现，比如`<b>`和`</b>`。前者是开始标签，后者是结束标签。一个标签也通常称为一个元素。

通常一个网页需要包括以下框架：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>QXZ's WuZiQi</title>
    </head>

    <body>
        <h1>这是一个一级标题。</h1>
        <h2>这是一个二级标题。</h2>
        <p>这是第一个段落。</p>
        <br>
        <p>这是第二个段落。</p>
        <hr>
        <a href="https://www.cnblogs.com/qixingzhi/">这是一个链接</a>
        <!-- 这是一个注释 -->
    </body>
</html>
```

head中的`<meta charset="utf-8">`的声明用来显示中文，title是网页标题。

body部分是会在网页上显示出来的内容。其中`<h1>`，`<h2>`表示1级标题、2级标题。`<p>`表示段落（正文）。`<br>`表示换行，通常可以不写出`</br>`。`<hr>`表示水平线。`<!--txt-->`表示注释。

元素可以设置属性，属性一般在开始标签中赋值。例如，链接属性这样定义：`<a href="https://www.cnblogs.com/qixingzhi/">这是一个链接</a>`。常用的还有class、id、style、title等等。

文本可以设置格式化。`<b>`表示加粗，`<i>`表示斜体，`<big>`用来放大，`<small>`用来放大，`<sub>`表示下标，`<sup>`表示上标……

## CSS

CSS 是在为了更好的渲染HTML元素而引入的。CSS 可以通过内联样式（"style" 属性）添加，也可以用内部样式表（在头部 `<head> `区域使用`<style>` 元素）。而最好的方式是通过外部引用CSS文件。

















