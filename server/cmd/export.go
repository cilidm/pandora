package cmd

import (
	"bufio"
	"fmt"
	"github.com/spf13/cobra"
	"io"
	"os"
	"pandora/common"
)

func init() {
	rootCmd.AddCommand(exportCmd)
	exportCmd.AddCommand(exportConfigCmd)
}

// 导出命令
var exportCmd = &cobra.Command{
	Use:   "export",
	Short: "Export pandora default settings, such as `export config`",
}

// 导出默认配置命令
var exportConfigCmd = &cobra.Command{
	Use:   "config",
	Short: "Export pandora default config file with `export config`",
	Run: func(cmd *cobra.Command, args []string) {
		f, err := os.Open(common.RunConfig)
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}
		defer f.Close()

		// 按行读取文件
		reader := bufio.NewReader(f)
		for {
			line, _, err := reader.ReadLine()
			if err == io.EOF {
				break
			}
			if err != nil {
				fmt.Println(err)
				return
			}
			fmt.Println(string(line))
		}
	},
}
