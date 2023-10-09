import React, { useState } from "react";

import "./stylr.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../PlayBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadingImage/img";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                    {data?.results?.map((video)=>(
                        <div key={video.id} onClick={()=>{setShow(true) 
                        setVideoId(video.key)}}  className="videoItem">
                        <div className="videoThumbnail">
                            <Img  src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}/>
                            <PlayIcon/>
                        </div>
                        </div>
                ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;