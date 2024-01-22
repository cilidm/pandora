package main

import (
	"embed"
	"pandora/cmd"
	"pandora/common"
)

//go:embed config/*
var fs embed.FS // 固定格式，打包的时候会将 config 目录下面的文件都一起打包

func main() {
	common.FS = fs
	cmd.Execute()
}
