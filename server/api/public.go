package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"pandora/common"
	"pandora/pkg/response"
)

// 健康检测接口
func HealthHandler(ctx *gin.Context) {
	ctx.String(http.StatusOK, "OK")
}

// 开发者信息接口
func InfoHandler(ctx *gin.Context) {
	response.SuccessWithData(map[string]interface{}{
		"Developer": "Dylan Kuang",
		"Email":     "ezops.cn@gmail.com",
		"QQGroup":   "682374468",
	})
}

// 系统版本接口
func VersionHandler(ctx *gin.Context) {
	response.SuccessWithData(map[string]interface{}{
		"pandora": common.Version,
		"go":      "1.20",
	})
}
