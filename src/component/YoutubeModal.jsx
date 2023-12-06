import React, { useState } from "react";
import "../styles/YoutubeModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "../api/recipes/axios";
import Loading from "./Loading";

export default function YoutubeModal({ setModalOpen, setInputs, inputs }) {
  const [youtubeLink, setYoutubeLink] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setYoutubeLink(e.target.value);
  };

  const handleYoutubeSummarize = async () => {
    setLoading(true);
    document.getElementById("youtube_summary_error").innerText = "";

    await axios
      .post(`/articles/youtube/`, {
        url: youtubeLink,
      })
      .then(function (response) {
        setLoading(false);
        // console.log("reponse.data ", response.data);
        document.getElementById("youtube_summary_output").innerText =
          response.data.summary;
      })
      .catch(function (error) {
        setLoading(false);
        document.getElementById("youtube_summary_output").innerText = "";
        // console.log(error);
        if (error.response.status === 400) {
          document.getElementById("youtube_summary_error").innerText =
            "링크가 유효하지 않습니다.";
        }
        if (error.response.status === 500) {
          document.getElementById("youtube_summary_error").innerText =
            "한글 자막을 찾을 수 없거나 자막의 길이가 너무 깁니다. 다른 영상을 제출하세요.";
        }
      });
  };

  const handleSetInputContent = () => {
    setInputs({
      ...inputs,
      content: document.getElementById("youtube_summary_output").innerText,
    });
    setModalOpen(false);
  };

  const showInputs = () => {
    console.log("youtubeLink", youtubeLink);
  };

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <div onClick={() => setModalOpen(false)} className="modal-close">
            <FontAwesomeIcon icon={faCircleXmark} />
          </div>

          <div className="modal_content">
            <div className="youtube_modal_content">
              <div>
                <div className="youtube_modal_notice">* 요약 시 시간이 오래 소요될 수 있습니다.</div>
                <div className="youtube_modal_input_div">
                  <span className="youtube_modal_input_type">url</span>
                  <input
                    onChange={handleInputChange}
                    className="youtube_modal_input"
                  />
                  <button
                    onClick={handleYoutubeSummarize}
                    className="youtube_modal_summarize_btn"
                  >
                    요약
                  </button>
                </div>

                <div className="youtube_modal_output_div">
                  <div className="youtube_modal_output_header">
                    <span>
                      <span className="youtube_modal_output_header_title">
                        영상 요약 :{" "}
                      </span>
                      <span
                        className="youtube_modal_output_error"
                        id="youtube_summary_error"
                      ></span>
                    </span>
                    <span className="youtube_modal_output_header_loading">
                      {loading && <Loading width="17px" backHeight="5px" />}
                    </span>
                  </div>
                  <div
                    id="youtube_summary_output"
                    className="youtube_modal_output_content"
                  ></div>
                </div>
              </div>

              <div className="youtube_modal_btn_div">
                <button
                  onClick={handleSetInputContent}
                  className="youtube_modal_btn"
                >
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
