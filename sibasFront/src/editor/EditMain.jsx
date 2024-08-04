import React, { useState } from 'react';
import './EditMain.css';
import FilePreview from '../FileUpload/FilePreview';
import '../FileUpload/FileUploader.css';
import Swal from 'sweetalert2';
const FileViewer = () => {
  const [preFile, setPreFile] = useState(null);
  const [postFile, setPostFile] = useState(null);
  const [focusPage, setFocusPage] = useState(0);
  const handlePreFileChange = (event) => {
    setPreFile(event.target.files[0]);
  };
  const handlePostFileChange = (event) => {
    setPostFile(event.target.files[0]);
  };
  const handleFocusPageChange = (value) => {
    setFocusPage(value);
  };
  let count = 0;
  const usingService = () => {
    if ((preFile !== null) & (postFile !== null)) {
      Swal.fire({
        title: 'NPNG disaster damage tester',
        html: `
        이미지 분할과 손상평가 진행중입니다.
        <hr />
        조금만 기다려 주십시오 감사합니다.
        <br />
        <br />
        <img src="earth-1917_256.gif" alt='hi' style='width:450px;'/>
        <br />
        
        <br />       
        `,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 20000,
        timerProgressBar: true,
      });
      setTimeout(() => {
        setFocusPage(1);
      }, '20000');
    }
  };
  return (
    <div className="edit-main-container">
      <div>
        <div
          className="edit-container"
          style={focusPage !== 0 ? { display: 'none' } : {}}
        >
          <div className="upload-container">
            <h1>재난전 사진을 업로드해주세요</h1>
            {preFile ? (
              <div className="preview_image">
                <FilePreview file={preFile} />
              </div>
            ) : (
              <div className="preview_image">이미지</div>
            )}
            <div className="upload-h2">
              <label htmlFor="main_input" id="main_input_label">
                Add Photo
                <input
                  id="main_input"
                  type="file"
                  onChange={handlePreFileChange}
                />
              </label>
            </div>
          </div>
          <div className="upload-container">
            <h1>재난후 사진을 업로드 해주세요</h1>
            {postFile ? (
              <div className="preview_image">
                <FilePreview file={postFile} />
              </div>
            ) : (
              <div className="preview_image">이미지</div>
            )}
            <div className="upload-h2">
              <label htmlFor="main_input_post" id="main_input_label_post">
                Add Photo
                <input
                  id="main_input_post"
                  type="file"
                  onChange={handlePostFileChange}
                />
              </label>
            </div>
          </div>
          <button
            className="btn_upload"
            style={{ position: 'absolute', right: '500px' }}
            onClick={() => usingService()}
          >
            getting start
          </button>
        </div>
        <div
          className="edit-container"
          style={focusPage !== 1 ? { display: 'none' } : {}}
        >
          <div>
            <span>재난전</span>
            <img className="service-img" src="342 pre.png" alt="342 pre" />
          </div>
          <div>
            <span>재난후</span>
            <img className="service-img" src="342 post.png" alt="342 post" />
          </div>
        </div>
        <div
          className="edit-container"
          style={focusPage !== 2 ? { display: 'none' } : {}}
        >
          <div>
            <span>재난전</span>
            <img
              className="service-img"
              src="재난전 432 라벨링.png"
              alt="재난전 432 라벨링"
            />
          </div>
          <div>
            <span>재난전</span>
            <img
              className="service-img"
              src="재난후 432 라벨링.png"
              alt="재난후 432 라벨링"
            />
          </div>
        </div>
        <div
          className="edit-container"
          style={focusPage !== 3 ? { display: 'none' } : {}}
        >
          <div>
            <span>2진이미지</span>
            <img
              className="service-img"
              src="output (1).png"
              alt="output (1)"
            />
          </div>
          <div>
            <span>실제 이미지</span>
            <img
              className="service-img"
              src="output (2).png"
              alt="output (2)"
            />
          </div>
        </div>
        <div
          className="edit-container"
          style={focusPage !== 4 ? { display: 'none' } : {}}
        >
          <div className="output-page" style={{ position: 'relative' }}>
            <div
              style={{
                display: 'flex',
                flex: 'column',
                width: '900px',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span>이진 이미지</span>
                <img
                  className="service-img"
                  src="output (1).png"
                  alt="output (1)"
                />
              </div>
              <div>
                <span>실제 이미지</span>
                <img
                  className="service-img"
                  src="output (2).png"
                  alt="output (2)"
                />
              </div>
            </div>
            <div style={{ position: 'absolute', left: '10px', top: '450px' }}>
              현재 사진으로 분석한결과 건물 영역 손상율은 54%로 측정 되었습니다.
            </div>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button
          onClick={() => handleFocusPageChange(0)}
          style={
            focusPage === 0
              ? { backgroundColor: 'white', color: '#727272' }
              : {}
          }
        >
          이미지 업로드 하기
        </button>
        <button
          onClick={() => handleFocusPageChange(1)}
          style={
            focusPage === 1
              ? { backgroundColor: 'white', color: '#727272' }
              : {}
          }
        >
          원본 사진 확인
        </button>
        <button
          onClick={() => handleFocusPageChange(2)}
          style={
            focusPage === 2
              ? { backgroundColor: 'white', color: '#727272' }
              : {}
          }
        >
          분할 결과 확인
        </button>
        <button
          onClick={() => handleFocusPageChange(3)}
          style={
            focusPage === 3
              ? { backgroundColor: 'white', color: '#727272' }
              : {}
          }
        >
          오버레이 이미지
        </button>
        <button
          onClick={() => handleFocusPageChange(4)}
          style={
            focusPage === 4
              ? { backgroundColor: 'white', color: '#727272' }
              : {}
          }
        >
          손상도 평가
        </button>
      </div>
    </div>
  );
};

export default FileViewer;
