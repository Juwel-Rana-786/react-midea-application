import { useState } from "react"
import styled from "styled-components"
import { data } from '../../db'


const Media = () => {

    const [imgData, setImgData] = useState(data)
    const [selectImg, setSelectImg] = useState([])

    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (name === "allSelect") {
            const checkedValue = data.map((value) => { return { ...value, isChecked: checked } });
            setImgData(checkedValue);
            (checked) ? setSelectImg(checkedValue) : setSelectImg([])


        } else {
            return;
        }
    }
    return (
        <Wrapper >
            <div className="header d-flex justify-content-between px-5 py-3 fw-bold ">
                <input type="checkbox" name="allSelect" checked={!imgData.some((data) => data?.isChecked !== true)} onChange={handleChange} id="" />
                <span> {selectImg.length} Files Selected</span>
                <span>Delete Files</span>
            </div>
            <div className="grid-container py-5">
                {imgData.map((data, i) => {

                    return (

                        <div className={`item item${i} h-100 w-100 position-relative`} key={i} >
                            <input className="checkBox" type="checkbox" checked={data?.isChecked || false} name={data.id} onChange={handleChange} id={`item${i}`} />
                            <label className="overlay h-100 w-100" htmlFor={`item${i}`}>
                                <img className=" img-fluid" src={data.productImage} alt="product-img" />
                            </label>

                        </div>
                    )
                })}
                <div className="upload-image">
                    <img src="" alt="" />
                </div>
            </div>

        </Wrapper >
    )
}
const Wrapper = styled.div`
width: 80vw;


.grid-container{
    display: grid;
    grid-template-columns:repeat(auto-fit,250px);

    grid-gap: 20px;
}
.item{
    border: 1px solid #f4f4f4;
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




`
export default Media
