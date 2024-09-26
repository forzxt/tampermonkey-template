const app = () => {
  function dragBtn() {
    const bika_download_element = document.querySelector('#bika_download') as any;
    if (!bika_download_element) {
      return;
    }
    bika_download_element.addEventListener('mousedown', function (event: any) {
      bika_download_element.style.transition = 'null';
      const disX = event.clientX - bika_download_element.offsetLeft;
      const disY = event.clientY - bika_download_element.offsetTop;

      const move = function (event: any) {
        bika_download_element.style.left = event.clientX - disX + 'px';
        bika_download_element.style.top = event.clientY - disY + 'px';
      };

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', move);

        if (parseInt(bika_download_element.style.left) < 0) {
          bika_download_element.style.right = 'auto';
          bika_download_element.style.left = '-190px';
          bika_download_element.style.opacity = '0.1';
        } else if (parseInt(bika_download_element.style.left) + 200 > window.innerWidth) {
          bika_download_element.style.left = 'auto';
          bika_download_element.style.right = '-190px';
          bika_download_element.style.opacity = '0.1';
        } else {
          bika_download_element.style.opacity = '0.8';
        }

        bika_download_element.positionTop = bika_download_element.offsetTop;
        GM_setValue('bika_download_element', bika_download_element);
      });
    });

    bika_download_element.addEventListener('mouseenter', function (event: any) {
      const { offsetX, clientX } = event;
      if (offsetX >= 190 && clientX <= 10) {
        bika_download_element.style.transition = 'all 0.3s';
        bika_download_element.style.left = '0px';
        bika_download_element.style.right = 'auto';
        bika_download_element.style.opacity = '0.8';
      }
      if (offsetX <= 10 && clientX >= window.innerWidth - 10) {
        bika_download_element.style.transition = 'all 0.3s';
        bika_download_element.style.left = 'auto';
        bika_download_element.style.right = '0';
        bika_download_element.style.opacity = '0.8';
      }
      bika_download_element.addEventListener('mouseleave', function (event: any) {
        if (bika_download_element.offsetLeft <= 0) {
          console.log('左侧收缩');
          bika_download_element.style.left = '-190px';
          bika_download_element.style.right = 'auto';
          bika_download_element.style.opacity = '0.1';
        }
        if (bika_download_element.offsetLeft >= window.innerWidth - 200) {
          console.log('右侧收缩');
          bika_download_element.style.left = 'auto';
          bika_download_element.style.right = '-190px';
          bika_download_element.style.opacity = '0.1';
        }
      });
    });
  }
  // 创建用户界面
  function createUI() {
    const bika_download = document.createElement('div');

    bika_download.id = 'bika_download';
    bika_download.innerHTML = `${bika_download.innerHTML}<style>
#bika_download {
    width :200px;
    height :350px;
    position :fixed;
    left :-190px;
    top :150px;
    background :rgba(0,0,0,0.5);
    opacity :0.1;
    cursor :move;
    overflow :auto;
    color :#fff;
    fontSize :14px;
}
#bika_download_list{
    padding: 0 4px;
}
#bika_download_list::-webkit-scrollbar {
     width: 4px;
     height: 4px;
 }
 /* 滚动条滑块（里面小方块） */
 #bika_download_list::-webkit-scrollbar-thumb {
     border-radius: 12px;
     box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
     background: rgba(0,0,0,0.9);
 }
 /* 滚动条轨道 */
 #bika_download_list::-webkit-scrollbar-track {
     border-radius: 0;
     box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
     background: rgba(0,0,0,0.2);
 }
 #bika_download_actions_bar {
     width: 100%;
    height: 60px;
    background: rgba(0,0,0,.3);
 }
</style>`;

    const bika_download_actions_bar = document.createElement('div');
    bika_download_actions_bar.id = 'bika_download_actions_bar';
    const bika_download_list = document.createElement('div');
    bika_download_list.id = 'bika_download_list';

    bika_download.appendChild(bika_download_actions_bar);
    bika_download.appendChild(bika_download_list);
    document.body.appendChild(bika_download);

    dragBtn();
  }

  function main(): void {
    createUI();
  }
  main();
};
export default app;
