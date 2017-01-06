# zupload

为系统平台提供统一的文件管理模块，包括文件上传、文件删除、文件下载。

## API

接口 | 方法 | 参数 | 说明
---|---|---|---
zupload/up | POST | input | 向 up 发起 post 请求，文件存入 ./upload_dir/yyyymmdd/ 目录，成功后返回详细信息(json)
zupload/del | GET | path | 向 del 发起 get 请求，参数 path 为文件路径
zupload/down | GET | path,name | 向 down 发起 get 请求，path 为文件路径，name 为文件名(name 可选)

zupload/ + path 可以直接访问文件 
eg: http://127.0.0.1/zuplad/20170106/upload_a4425260d78ebea1868437457057bf4c.ico