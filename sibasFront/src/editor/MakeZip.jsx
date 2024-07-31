import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import axios from 'axios';
const MakeHtml = (selectedIndices, resultPaths, originalRef) => {
  console.log(selectedIndices);
  console.log(resultPaths);
  console.log(originalRef);
  let cloneHTML = '';
  const fetchSampleHTML = async () => {
    try {
      // 서버에서 sample.html 파일을 가져옴
      const response = await axios.get('http://localhost:3000/api/sample', {
        responseType: 'text',
      });
      const text = response.data;

      // HTML 파싱
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');

      // 기존 body 태그 추출 및 cloneNodeWithInlineStyles 결과로 교체
      const body = doc.getElementsByTagName('body')[0];
      if (originalRef.current && body) {
        const clone = cloneNodeWithInlineStyles(originalRef.current);
        body.innerHTML = ''; // 기존 내용 제거
        body.appendChild(clone); // 스타일이 적용된 clone 노드 추가

        // 최종 HTML 문자열
        return doc.documentElement.outerHTML;
      }
    } catch (error) {
      console.error('Error fetching sample HTML:', error);
    }
  };

  /* html 화면 캡쳐(스타일 포함) */
  function cloneNodeWithInlineStyles(node) {
    const clone = node.cloneNode(true);

    /* 스타일 가져옴 */
    function applyStyles(source, target) {
      if (source.nodeType === Node.ELEMENT_NODE) {
        const computedStyle = window.getComputedStyle(source);
        let styleString = '';
        for (const key of computedStyle) {
          styleString += `${key}: ${computedStyle.getPropertyValue(key)}; `;
        }
        target.setAttribute('style', styleString);
      }

      const children = source.childNodes;
      for (let i = 0; i < children.length; i++) {
        if (target.childNodes[i]) {
          applyStyles(children[i], target.childNodes[i]);
        }
      }
    }

    applyStyles(node, clone);
    return clone;
  }
  const downloadZipFile = async () => {
    const zip = new JSZip();
    const folder = zip.folder('images');

    for (const index of selectedIndices) {
      const base64Image = resultPaths[index][0];
      const response = await fetch(base64Image);
      const blob = await response.blob();
      folder.file(`image${index + 1}.png`, blob);
    }
    cloneHTML = fetchSampleHTML();
    zip.file('example.html', cloneHTML);
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'images_and_html.zip');
    });
  };

  downloadZipFile();
};

export default MakeHtml;
