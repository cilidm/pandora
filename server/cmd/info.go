package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
	"os"
	"pandora/common"
)

func init() {
	rootCmd.AddCommand(versionCmd)
	rootCmd.AddCommand(infoCmd)
}

// 版本信息
var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Show pandora version",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Go 1.20")
		fmt.Println("Pandora", common.Version)
		os.Exit(0)
	},
}

// 开发者信息
var infoCmd = &cobra.Command{
	Use:   "info",
	Short: "Show pandora information",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Pandora is developed by Dylan.")
		fmt.Println("You can contact for help with email <ezops.cn@gmail.com> or QQ group <682374468>.")
		os.Exit(0)
	},
}
