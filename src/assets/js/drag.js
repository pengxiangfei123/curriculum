import Vue from 'vue'
import $ from './jquery-vender'
Vue.directive('dialogDrag', {
  bind (el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')

    const dragDom = el.querySelector('.el-dialog')

    // dialogHeaderEl.style.cursor = 'move';

    dialogHeaderEl.style.cssText += ';cursor:move;'

    dragDom.style.cssText += ';top:0px;'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);

    const sty = (function () {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr]
      }
    })()
    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离

      const disX = e.clientX - dialogHeaderEl.offsetLeft

      const disY = e.clientY - dialogHeaderEl.offsetTop

      const screenWidth = document.body.clientWidth // body当前宽度

      const screenHeight = document.documentElement.clientHeight // 可见区域高度(应为body高度，可某些环境下无法获取)

      const dragDomWidth = dragDom.offsetWidth // 对话框宽度

      const dragDomheight = dragDom.offsetHeight // 对话框高度

      const minDragDomLeft = dragDom.offsetLeft

      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

      const minDragDomTop = dragDom.offsetTop

      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight

      // 获取到的值带px 正则匹配替换

      let styL = sty(dragDom, 'left')

      let styT = sty(dragDom, 'top')

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px

      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100)

        styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100)
      } else {
        styL = +styL.replace(/\px/g, '')
        styT = +styT.replace(/\px/g, '')
      };
      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离

        let left = e.clientX - disX

        let top = e.clientY - disY

        // 边界处理

        if (-(left) > minDragDomLeft) {
          left = -(minDragDomLeft)
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }

        if (-(top) > minDragDomTop) {
          top = -(minDragDomTop)
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        // 移动当前元素

        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
      }
      document.onmouseup = function (e) {
        document.onmousemove = null

        document.onmouseup = null
      }
    }
  }
})
Vue.directive('loadmore', {
  bind (el, binding) {
    // 获取element-ui定义好的scroll盒子
    // el-select-dropdown
    const SELECTWRAP_DOM = el.querySelector('.el-popper')
    var boo = true
    var top
    window.addEventListener('scroll', function (event) {
      // console.log(el)
      const dom = el.querySelector('.el-date-picker')
      // const SELECTWRAP_DOM = el.querySelector('.el-picker-panel')
      // console.log(SELECTWRAP_DOM)
      // const SELECTWRAP_DOM = el.querySelector('.el-popper')
      if (!SELECTWRAP_DOM) {
        return
      }
      // console.log(el)
      if (SELECTWRAP_DOM.style.display !== 'none') {
        // console.log(SELECTWRAP_DOM)
        if (boo) {
          top = parseInt(SELECTWRAP_DOM.style.top)
          boo = false
        }
        const minWidth = document.getElementsByClassName('main-wrapper')[0]
        const scrollTop = minWidth.scrollTop
        SELECTWRAP_DOM.style.top = top - scrollTop + 'px'
      }
    }, true)
  }
})



// 设置默认溢出显示数量
var spillDataNum = 20;

// 设置隐藏函数
var timeout = false;
let setRowDisableNone = function (topNum, showRowNum, binding) {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    // console.log(topNum, topNum + showRowNum + spillDataNum)
    binding.value.call(null, topNum, topNum + showRowNum + spillDataNum);
  });
};
// export default
const loadmores = {
  name: 'loadmores',
  componentUpdated: function (el, binding, vnode, oldVnode) {
    setTimeout(() => {
      const dataSize = vnode.data.attrs['data-size'];
      const oldDataSize = oldVnode.data.attrs['data-size'];
      // console.log(vnode, oldVnode)
      // console.log(dataSize, oldDataSize)
      if (dataSize === oldDataSize) {
        return;
      }
      const selectWrap = el.querySelector('.el-table__body-wrapper');
      const selectTbody = selectWrap.querySelector('table tbody');
      const selectRow = selectWrap.querySelector('table tr');

      selectWrap.removeEventListener('scroll', hand)

      if (!selectRow) {
        return;
      }
      // console.log(selectRow)
      // const rowHeight = selectRow.clientHeight;
      const rowHeight = 61
      let showRowNum = Math.round(selectWrap.clientHeight / rowHeight);
      // console.log(document.getElementById('heightTr'))
      const heightTr = document.getElementById('heightTr')
      if (heightTr) {
        heightTr.parentNode.removeChild(heightTr)
      }
      const createElementTR = document.createElement('tr');
      createElementTR.setAttribute('id', 'heightTr')
      // console.log(dataSize, showRowNum, spillDataNum, rowHeight)
      let createElementTRHeight = (dataSize - showRowNum - spillDataNum) * rowHeight;
      createElementTR.setAttribute('style', `height: ${createElementTRHeight}px;`);
      selectTbody.append(createElementTR);

      function hand () {
        // console.log(el.getAttribute('data-size'))
        let topPx = this.scrollTop - spillDataNum * rowHeight;
        let topNum = Math.round(topPx / rowHeight);
        // console.log(rowHeight)
        let minTopNum = dataSize - spillDataNum - showRowNum;
        if (topNum > minTopNum) {
          topNum = minTopNum;
        }
        if (topNum < 0) {
          topNum = 0;
          topPx = 0;
        }

        // showRowNum++
        selectTbody.setAttribute('style', `transform: translateY(${topPx}px)`);
        createElementTR.setAttribute('style', `height: ${createElementTRHeight - topPx > 0 ? createElementTRHeight - topPx : 0}px;`);
        // showRowNum++
        // console.log(topNum, showRowNum, binding)
        setRowDisableNone(topNum, showRowNum, binding);
      }
      // 监听滚动后事件
      selectWrap.addEventListener('scroll', hand)
    });
  }
};
Vue.directive('loadmores', loadmores)
