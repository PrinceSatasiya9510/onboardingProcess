import React, { useRef, useState } from 'react'
import ReactCrop, { centerCrop, makeAspectCrop, } from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css';
// or scss:
// import 'react-image-crop/lib/ReactCrop.scss';

export default function ImageCropper() {

    const inputRef = useRef()
    const [imageUrl, setImageUrl] = useState(null)
    const [canvasToImage, setCanvasToImage] = useState(null)
    const [crop, setCrop] = useState(undefined)
    const canvasRef = useRef()
    const [completedCrop, setCompletedCrop] = useState(null);
    const imageRef = useRef()



    const imageLoad = () => {
        const file = inputRef.current.files[0]


        const fileReader = new FileReader()

        fileReader.addEventListener("load", function () {
            const URL = fileReader.result
            // console.log("🚀 ~ imageLoad ~ URL:", URL)
            setImageUrl(URL)

        })
        fileReader.readAsDataURL(file);

    }

    const canvasView = () => {
        // console.log(crop)
        let image = imageRef.current
        let canvas = canvasRef.current
        console.log("🚀 ~ canvasView ~ canvas:", canvas.width)
        console.log("🚀 ~ canvasView ~ completedCrop:", completedCrop)

        const ctx = canvasRef.current.getContext('2d');

        // ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, 160, 60)


        const x = image.naturalWidth / image.width;
        const y = image.naturalHeight / image.height;
        canvas.width = completedCrop.width * x;
        canvas.height = completedCrop.height * y;

        ctx.drawImage(
            image,
            completedCrop.x * x,
            completedCrop.y * y,
            completedCrop.width * x,
            completedCrop.height * y,
            0,
            0,
            completedCrop.width * x,
            completedCrop.height * y
        );

        setCanvasToImage(canvas.toDataURL())
    }


    const center = (e) => {
        const { width, height } = e.currentTarget;
        const aspect = 1;
        console.log("🚀 ~ prefixCrop ~ height:", height)
        console.log("🚀 ~ prefixCrop ~ width:", width)


        const small = Math.min(width, height);
        const cropSize = small * 0.60;

        const crop = makeAspectCrop(
            {
                unit: "px",
                width: cropSize,
            },
            aspect,
            width,
            height
        );

        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
        setCompletedCrop(centeredCrop);
    };


    return (
        <>
            <input type="file" ref={inputRef} onChange={imageLoad} />

            <div>
                {imageUrl ?
                    <>
                        <ReactCrop
                            aspect={1}
                            minWidth={150}
                            onComplete={(crop) => setCompletedCrop(crop)}
                            onChange={(crop, percentCrop) => setCrop(percentCrop)}
                            crop={crop}>
                            <img
                                className='image'
                                ref={imageRef}
                                src={imageUrl}
                                onLoad={center}
                            />
                        </ReactCrop>
                        <button onClick={() => canvasView()}>Crop</button>
                    </>
                    : null
                }
            </div>

            <canvas
                ref={canvasRef}
            />

            {canvasToImage && (
                <img className='canvasToImage' src={canvasToImage} alt="" />

            )
            }
        </>
    )
}

