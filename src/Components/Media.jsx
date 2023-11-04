import { useEffect, useRef, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

const data = [
    {
        "id": 1,
        "productImage": "https://i.postimg.cc/8PRkpn9f/image-11.jpg"
    },
    {
        "id": 2,
        "productImage": "https://i.postimg.cc/HLskP4Sc/image-2.webp"
    },
    {
        "id": 3,
        "productImage": "https://i.postimg.cc/Cx01bVk4/image-3.webp"
    },
    {
        "id": 4,
        "productImage": "https://i.postimg.cc/qRNMpBHp/image-4.webp"
    },
    {
        "id": 5,
        "productImage": "https://i.postimg.cc/TP738LSk/image-5.webp"
    },
    {
        "id": 6,
        "productImage": "https://i.postimg.cc/RVKh306F/image-6.webp"
    },
    {
        "id": 7,
        "productImage": "https://i.postimg.cc/0Qh5jg9D/image-7.webp"
    },
    {
        "id": 8,
        "productImage": "https://i.postimg.cc/FzcrJPKq/image-8.webp"
    },
    {
        "id": 9,
        "productImage": "https://i.postimg.cc/MZjK4GYD/image-9.webp"
    },
    {
        "id": 10,
        "productImage": "https://i.postimg.cc/hPWPqqyq/image-10.jpg"
    },
    {
        "id": 11,
        "productImage": "https://i.postimg.cc/nh1Lkw1f/image-1.webp"
    },

];
const Media = () => {

    const [imgData, setImgData] = useState([])
    const [isChecked, setIsChecked] = useState([])
    const inputRef = useRef()



    useEffect(() => {

        // const api = "http://localhost:3000/image"
        // try {
        //     axios.get(api)
        //         .then((res) => setImgData(res.data))
        // } catch (error) {
        //     console.log("object")
        // }
        setImgData(data)

    }, [])

    const handleChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setIsChecked([...isChecked, value])


        } else {
            setIsChecked(isChecked.filter((curEle) => curEle !== value))


        }

    }

    const handleInputImgClick = () => {
        inputRef.current.click();
    }
    const uploadImg = (e) => {

        const newItem = {
            id: uuidv4(),
            productImage: URL.createObjectURL(e.target.files[0])
        }


        setImgData([...imgData, newItem])

    }


    const Delete = () => {
        const conf = window.confirm('Are you sure you want to delete')
        if (conf) {
            var filteredArray = imgData.filter(function (n) {
                return isChecked.indexOf(String(n.id)) == -1;
            });
            setImgData(filteredArray);
            setIsChecked([])
        }



    }
    return (
        <Wrapper >
            <div className="header d-flex justify-content-between pe-5 py-3 fw-bold ">
                <div>

                    <input type="checkbox"
                        value="allSelect"
                        checked={(isChecked.length > 0) && "true"}


                        id="" />

                    {/* {(isChecked.length > 0) && <span> {isChecked.length} Files Selected</span>} */}
                    <span> {isChecked.length} Files Selected</span>
                </div>
                <button className="delete btn fw-bold p-0 text-danger" onClick={Delete}>Delete Files</button>
            </div>
            <div className="grid-container py-5">
                {imgData.map((data, i) => {
                    return (

                        <div key={i} className={`item item${i} h-100 w-100 position-relative`} >
                            <input className="checkBox" type="checkbox" value={data.id} onChange={handleChange} id={`item${i}`} />
                            <label className="overlay h-100 w-100" htmlFor={`item${i}`}>
                                <img loading="lazy" className=" img-fluid" src={data.productImage} alt="product-img" />
                            </label>
                        </div>
                    )
                })}
                <div onClick={handleInputImgClick} className="upload-image d-flex justify-content-center align-items-center  ">
                    <div>
                        <span className="icon text-center"><RiImageAddFill /></span>
                        <div> Upload Image</div>
                        <input ref={inputRef} className="d-none" onChange={uploadImg} type="file" />
                    </div>


                </div>
            </div>

        </Wrapper >
    )
}
const Wrapper = styled.div`

width: 90vw;
.header{
    border-bottom: 1px solid #ccc;
}

.grid-container{
    display: grid;
    grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
    grid-gap: 20px;
}
.item{
    border: 1px solid #cacaca;
    position: relative;
    overflow: hidden;
    border-radius: 5px;
    transition: all .6s;
    &:hover{ 
        transition: all .6s;
        .overlay::after{
           
       
content: "";
position: absolute;
height: 100% !important;
width: 100%;
background-color: black;
top: 0;
left: 0;
z-index: 9;
opacity: .6;
}  
    }
   & input[type=checkbox]:checked + label img{
opacity: .6;
 
}


}
 .item:first-child{
    grid-row: 1 / 3;
    grid-column: 1 / 3;
    
 }
img{
    max-width: 100%;
}
.checkBox{
    position: absolute;
    top: 15px;
    left: 15px;
    z-index: 99;
   
}

.upload-image{
    border: 1px dashed #cacaca;
    cursor: pointer;
    span{
      font-size: 60px;  
      display: block;
    }
    
}

@media (max-width:450px) {

        width: 100vw;
        margin: 20px;
    
    padding:0;
    .grid-container{
 grid-template-columns:50% 50%;
    }
   
}

`
export default Media
