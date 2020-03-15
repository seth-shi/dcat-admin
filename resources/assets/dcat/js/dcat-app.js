
/*=========================================================================================
  File Name: app.js
  Description: Dcat Admin JS脚本.
  ----------------------------------------------------------------------------------------
  Item Name: Dcat Admin
  Author: Jqh
  Author URL: https://github.com/jqhph
==========================================================================================*/

import Dcat from './Dcat'

import NProgress from './nprogress/NProgress.min'
import Helpers from './extensions/Helpers'
import Ajax from './extensions/Ajax'
import Toastr from './extensions/Toastr'
import SweetAlert2 from './extensions/SweetAlert2'
import RowSelector from './extensions/RowSelector'
import Grid from './extensions/Grid'
import Form from './extensions/Form'
import DialogForm from './extensions/DialogForm'

import Menu from './bootstrappers/Menu'
import Footer from './bootstrappers/Footer'
import Pjax from './bootstrappers/Pjax'

let win = window,
    $ = jQuery;

// 扩展Dcat对象
function extend (Dcat) {
    new Helpers(Dcat);
    new Ajax(Dcat);
    new Toastr(Dcat);
    new SweetAlert2(Dcat);
    new Grid(Dcat);

    // NProgress
    Dcat.NP = NProgress;

    // 行选择器
    Dcat.RowSelector = function (options) {
        return new RowSelector(options)
    };

    // ajax表单提交
    Dcat.Form = function (options) {
        return new Form(options)
    };

    // 弹窗表单
    Dcat.DialogForm = function (options) {
        return new DialogForm(Dcat, options);
    };

    // 滑动窗
    Dcat.Slider = function (options) {

    };
}

// 初始化
function listen(Dcat) {
    // 只初始化一次
    Dcat.booting(() => {
        // 菜单点击选中效果
        new Menu(Dcat);
        // 返回顶部按钮
        new Footer(Dcat);

        // layer弹窗设置
        layer.config({maxmin: true, moveOut: true, shade: false});

        // ajax全局设置
        $.ajaxSetup({
            cache: true,
            error: Dcat.handleAjaxError
        });

        Dcat.NP.configure({parent: '.app-content'});
    });

    // 每个请求都初始化
    Dcat.bootingEveryRequest(() => {
        // pjax初始化功能
        new Pjax(Dcat);

    });
}

// 开始初始化
function boot(Dcat) {
    extend(Dcat);
    listen(Dcat);

    $(Dcat.boot.bind(Dcat));

    return Dcat;
}

win.CreateDcat = function(config) {
    return boot(new Dcat(config));
};

