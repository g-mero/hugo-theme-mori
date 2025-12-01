+++
title = 'Markdown Syntax Guide'
date = 2024-11-17T10:00:00+08:00
lastmod = 2025-11-19
draft = false
tags = ['Markdown', 'Tutorial']
categories = ['Guides']
+++

This article introduces commonly used Markdown syntax.

## Headings

Use `#` to create headings, the number indicates the level.

## Text Styles

- **Bold text**
- _Italic text_
- ~~Strikethrough~~

## Links and Images

[This is a link](https://example.com)

![Local image](/autumn-7493439_1280.jpg "This is a local image")

![Remote image](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80 "This is a remote image")

## Code

Inline code: `const x = 1;`

Code block:

```python
def hello_world():
    print("Hello, World!")
```

```shell
netsh advfirewall firewall add rule name="GameStream UDP" dir=in protocol=udp localport=5353,47998-48010 action=allow
netsh advfirewall firewall add rule name="GameStream TCP" dir=in protocol=tcp localport=47984,47989,48010 action=allow
```

## Lists

Unordered list:

- Item 1
- Item 2
- Item 3

Ordered list:

1. First step
2. Second step
3. Third step

## Blockquote

> This is a quoted text.
> It can span multiple lines.

## Table

| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| A        | B        | C        |
| D        | E        | F        |

That's the basic Markdown syntax!
