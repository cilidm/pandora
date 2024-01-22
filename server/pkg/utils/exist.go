package utils

import (
	"fmt"
	"os"
)

// 判断文件是否存在
func FileExists(filename string) (bool, error) {
	stat, err := os.Stat(filename)
	if !os.IsNotExist(err) {
		if !stat.IsDir() {
			return true, nil
		}
		return false, fmt.Errorf("the path %s exists, but it is a directory", filename)
	}
	return false, fmt.Errorf("the file %s not exists", filename)
}

// 判断目录是否存储
func DirExists(dirname string) (bool, error) {
	stat, err := os.Stat(dirname)
	if !os.IsNotExist(err) {
		if stat.IsDir() {
			return true, nil
		}
		return false, fmt.Errorf("the path %s exists, but it is a file", dirname)
	}
	return false, fmt.Errorf("the directory %s not exists", dirname)
}
