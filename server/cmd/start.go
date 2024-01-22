package cmd

import (
	"context"
	"fmt"
	"github.com/spf13/cobra"
	"net/http"
	"os"
	"os/signal"
	"pandora/common"
	"pandora/initialize"
	"pandora/pkg/utils"
	"time"
)

func init() {
	rootCmd.AddCommand(startCmd)
	// 指定配置文件参数
	startCmd.Flags().StringVarP(&common.RunConfig, "config", "f", common.RunConfig, "specify run config for pandora")
}

// 启动命令
var startCmd = &cobra.Command{
	Use:   "start",
	Short: "Start pandora with some flags",
	Run: func(cmd *cobra.Command, args []string) {
		// Logo
		fmt.Println(common.Logo)

		// 配置文件初始化
		initialize.Config()

		// 日志初始化
		initialize.Logger()

		// 数据库连接初始化
		initialize.MySQL()

		// 路由初始化
		r := initialize.Router()

		// 判断参数是否合法
		if !utils.IsIPAddress(common.Config.System.Listen) {
			common.Log.Error("listen IP address is invalid")
			return
		}

		// 检测端口是否合法
		if !utils.IsPort(common.Config.System.Port) {
			common.Log.Error("listen port is invalid")
			return
		}

		// 监听地址
		listenAddress := fmt.Sprintf("%s:%s", common.Config.System.Listen, common.Config.System.Port)
		common.Log.Info("listen address: ", listenAddress)

		// 配置服务
		server := http.Server{
			Addr:    listenAddress,
			Handler: r,
		}

		// 启动服务
		go func() {
			err := server.ListenAndServe()
			if err != nil && err != http.ErrServerClosed {
				common.Log.Error(err)
				panic(err)
			}
		}()

		// 接收优雅关闭信号
		quit := make(chan os.Signal, 1)
		signal.Notify(quit, os.Interrupt)
		<-quit

		// 等待5秒然后停止服务
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		err := server.Shutdown(ctx)
		if err != nil {
			common.Log.Error(err)
			panic(err)
		}
		common.Log.Info("service shutdown success")
	},
}
