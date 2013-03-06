# Jackinabox image gallery jQuery plugin

## Demo
[Jackinabox Demo](http://bradshaw-design.co.nz/)

## Description & Usage
The Jackinabox plugin attaches a click event handler for all child elements of a container:

```js
$('.thumbs').jackinabox();
```
Your HTML should be layed out similar to this, with the class "jackbox" added for all "&lt;a&gt;" child elements of the container:

```html
<div class="thumbs clearfix">
    <a class="jackbox" href="images/image_1.jpg" title="Click arrow to cycle through images" ><img src="images/thumb_1.jpg" alt="" /></a>
    <a class="jackbox" href="images/image_2.jpg" title="You can also use the arrow keys to cycle through the images" ><img src="images/thumb_2.jpg" alt="" /></a>
    <a class="jackbox" href="images/image_3.jpg" title="To exit image preview, simply click the background" ><img src="images/thumb_3.jpg" alt="" /></a>
    <a class="jackbox" href="images/image_4.jpg" title="Or, you can push the escape key to exit the preview" ><img src="images/thumb_4.jpg" alt="" /></a>
    <a class="jackbox" href="images/image_5.jpg" title="Jackinabox..." ><img src="images/thumb_5.jpg" alt="" /></a>
    <a class="jackbox" href="images/image_6.jpg" title="Brought to you by The Amazing Carl!" ><img src="images/thumb_6.jpg" alt="" /></a>
    <a class="jackbox" href="images/image_7.jpg" title="Jackinabox" ><img src="images/thumb_7.jpg" alt="" /></a>
    <a class="jackbox" href="images/image_8.jpg" title="Jackinabox" ><img src="images/thumb_8.jpg" alt="" /></a>
    <a class="jackbox" href="images/image_9.jpg" title="Jackinabox" ><img src="images/thumb_9.jpg" alt="" /></a>
    <a class="jackbox" href="images/image_10.jpg" title="Jackinabox" ><img src="images/thumb_10.jpg" alt="" /></a>
</div>
```


## Requirements
* [jQuery](http://jquery.com/) v. 1.7+
* [jQuery easing](http://jqueryui.com/) v. 1.3+

## Refernce
If you are to use this plugin, please credit me by adding the following text in a comment block with the plugin:


 * jQuery Image Gallery Plugin 2.5
 * https://github.com/carlopogus/jackinabox
 *
 * Copyright 2013, Carl Bradshaw
 * https://bradshaw-design.co.nz
 *
 * Please credit me :)

