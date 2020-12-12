import "./app2.css"
import $ from "jquery"

const $tabBar = $("#app2 .tab-bar")
const $tabContent = $("#app2 .tab-content")

$tabBar.on('click', 'li', e => {
    const $li = $(e.currentTarget)
    // 将自身class设置为选中，将兄弟的选中状态去掉
    $li.addClass("selected").siblings().removeClass("selected")
    const index = $li.index()
    $tabContent.children().eq(index).addClass("active").siblings().removeClass("active")
})

$tabBar.children().eq(0).trigger('click')