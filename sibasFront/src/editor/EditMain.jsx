import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import './EditMain.css';
import MakeZip from './MakeZip';
import FilePreview from '../FileUpload/FilePreview';
import '../FileUpload/FileUploader.css';

const predict = 0.645;
const Container = styled.div`
  position: relative;
  width: ${1024 * predict}px;
  height: ${1024 * predict}px;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  border: 2px solid #ccc;
`;

const BackgroundImage = styled.img.attrs((props) => ({
  'data-selected': props.isSelected ? 'true' : 'false',
}))`
  position: absolute;
  left: ${(props) => props.coordinates[0][0] * predict} px;
  top: ${(props) => props.coordinates[0][1] * predict} px;
  width: 100%;
  height: 100%;
  z-index: 0;
  display: ${(props) => (props['data-selected'] === 'true' ? 'block' : 'none')};
`;
/* prettier-ignore */
const OverlayImage = styled.img.attrs((props) => ({
  'data-selected': props.isSelected ? 'true' : 'false',
}))`
  position: absolute;
  left: ${(props) => props.coordinates[3][1] * predict}px;
  top: ${(props) => props.coordinates[3][0] * predict}px;
  width: ${(props) =>(props.coordinates[0][1] - props.coordinates[2][1] )* predict}px;
  height: ${(props) =>(props.coordinates[1][0] - props.coordinates[0][0]) * predict}px;
  &:hover {
    border: 2px solid red;
  }
  z-index: ${(props) => props.idx};
  display: ${(props) => (props['data-selected'] === 'true' ? 'block' : 'none')};
  cursor: pointer;
`;
const Sidebar = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  max-width: 400px;
  height: 150px;
  margin-left: 20px;
  padding: 10px;
  border: 2px solid #ccc;
`;

const ImageCheckbox = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  padding: 5px;
`;

const FileViewer = () => {
  const [res, setRes] = useState([]);
  const [resultPaths, setResultPaths] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [flag, setFlag] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploadFile, setIsUploadFile] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const originalRef = useRef(null);

  const navigate = useNavigate();
  /* 미리보기 이미지 */
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  /* 파일 업로드 */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      console.log('No file selected');
      return;
    }

    if (flag) return;

    const formData = new FormData();
    formData.append('file', file);
    console.log(12);
    try {
      setIsUploadFile(true);
      console.log('보냄');
      axios
        .post('http://localhost:3000/api/toss_data', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          setIsUploadComplete(true);
          console.log('good');
        });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  useEffect(() => {
    console.log(isUploadComplete);
    if (isUploadComplete && !flag) uploading();
  }, [isUploadComplete, flag]);
  useEffect(() => {
    if (res.length > 0) {
      handleResultImage();
    }
  }, [res]);
  const uploading = () => {
    /* 백엔드에서 분할 결과의 정보 가져오기 */
    axios
      .get('http://localhost:3000/api')
      .then((response) => {
        setRes(response.data);
        setSelectedIndices(response.data.map((_, index) => index));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    handleResultImage();
  };
  /*Base64 처리*/
  const getBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  /* 결과 사진 패치 */
  const handleResultImage = async () => {
    const tmp = [];
    let idx = 0;
    if (res.length > 0) {
      for (let count = 0; count < res.length; count += 1) {
        const resultname = res[count].name + '.png';
        try {
          const response = await axios.get(
            `http://localhost:3000/api/results/:${resultname}`,
            { responseType: 'blob' }
          );
          const base64Image = await getBase64(response.data);
          tmp[count] = [base64Image, idx];
          idx++;
        } catch (error) {
          console.error('Failed to fetch result image:', error);
        }
      }
      setResultPaths(tmp);
      setFlag(true);
    }
  };

  const handleCheckboxChange = (index) => {
    setSelectedIndices((prevSelectedIndices) => {
      if (prevSelectedIndices.includes(index)) {
        return prevSelectedIndices.filter((i) => i !== index);
      } else {
        return [...prevSelectedIndices, index];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedIndices((prevSelectedIndices) => {
      if (prevSelectedIndices.length === res.length) {
        return [];
      } else {
        return Array.from({ length: res.length }, (_, i) => i);
      }
    });
  };
  const delete_folder = () => {
    axios.get('http://localhost:3000/api/clear').then(() => {
      console.log('complete-deleter');
    });
  };

  const background = res.find((item) => item.label === 'background');
  const overlays = res.filter((item) => item.label !== 'background');

  if (resultPaths.length > 0) {
    let idx = 0;
    for (const data of res) {
      if (data.label === 'background') background.url = resultPaths[data.id][0];
      else {
        overlays[idx].url = resultPaths[data.id][0];
        idx++;
      }
    }
  }

  const handlePage = async (event) => {
    axios.get(`http://localhost:3000/api/clear`);
    navigate('/');
  };

  return (
    <div className="edit-container">
      <div className="upload-container">
        <form onSubmit={handleSubmit} className="seg_form">
          {file ? (
            <div className="preview_image">
              <FilePreview file={file} />
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
                onChange={handleFileChange}
                disabled={isUploadFile}
              />
            </label>
            {file ? (
              <button className="btn_upload" type="submit">
                업로드
              </button>
            ) : (
              <button className="btn_upload" type="submit" disabled>
                업로드
              </button>
            )}
          </div>
        </form>
        {isUploadComplete ? (
          <div className="selection-box">
            <Sidebar>
              {resultPaths &&
                resultPaths.map((image, index) => (
                  <ImageCheckbox key={index}>
                    <img
                      src={image[0]}
                      alt={`Result ${index + 1}`}
                      style={{
                        maxWidth: '70px',

                        height: '70px',
                      }}
                      onClick={() => handleCheckboxChange(index)}
                    />
                    <label className="instance_name">
                      <input
                        type="checkbox"
                        checked={selectedIndices.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      건물 {index + 1}
                    </label>
                  </ImageCheckbox>
                ))}
            </Sidebar>
          </div>
        ) : (
          <div>이미지 업로드를 진행 해주세요</div>
        )}
        {isUploadComplete ? (
          <div className="buttons">
            <button onClick={handleSelectAll}>
              {selectedIndices.length === res.length
                ? 'Unselect All'
                : 'Select All'}
            </button>
            <button
              onClick={() => MakeZip(selectedIndices, resultPaths, originalRef)}
            >
              Download
            </button>
            <button onClick={handlePage}>이전으로</button>
          </div>
        ) : (
          <></>
        )}
      </div>

      {isUploadComplete ? (
        <div className="container">
          {flag && (
            <div style={{ width: '100%', height: '100%' }} ref={originalRef}>
              {background && (
                <Container>
                  <BackgroundImage
                    src={background.url}
                    className={background.label}
                    alt={background.label}
                    coordinates={background.coordinates}
                    isSelected={selectedIndices.includes(background.id)}
                  />
                  {overlays.map((item) => (
                    <OverlayImage
                      key={item.id}
                      src={item.url}
                      className={item.label}
                      alt={item.label}
                      coordinates={item.coordinates}
                      isSelected={selectedIndices.includes(item.id)}
                      onClick={() => handleCheckboxChange(item.id)}
                    />
                  ))}
                </Container>
              )}
            </div>
          )}
        </div>
      ) : (
        <>이미지 업로드를 진행 해주세요</>
      )}

      <div onClick={() => delete_folder()}>지우자</div>
    </div>
  );
};

export default FileViewer;
