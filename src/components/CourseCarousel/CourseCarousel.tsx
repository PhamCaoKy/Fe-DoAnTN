
import { Carousel } from "@material-tailwind/react";
export default function CourseCarousel(props: any) {
  const course = props.props
  return (

    <div>
      {course==="Tiếng Việt"?  <Carousel className='rounded-xl w-1/2 slider_img mx-auto'>
      <img
        src="https://duhocvietphat.edu.vn/sites/default/files/2020-10/bai%20dang%20tuan%2042%20thang%207-01-03.png"
        alt="image 1"
        className="h-{510px} w-full object-cover"
      />
      <img
        src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/10/23/847931/Tieng-Viet.JPG"
        alt="image 2"
        className="h-full w-full object-cover "
      />
      <img
        src="https://media.baobinhphuoc.com.vn/upload/video/large/day_tieng_viet_lop_1_tap_1_09101720112021.jpg"
        alt="image 3"
        className="h-{200px} w-full object-cover"
      />
      </Carousel>:course==="Toán"?<Carousel className='rounded-xl w-1/2 slider_img mx-auto'>
      <img
        src="https://monkeymedia.vcdn.com.vn/upload/web/storage_web/23-03-2022_08:28:38_hoc-toan-lop-1-online-mien-phi.jpg"
        alt="image 1"
        className="h-{510px} w-full object-cover"
      />
      <img
        src="https://image-us.eva.vn/upload/1-2020/images/2020-03-09/cach-day-con-hoc-toan-lop-1-5-1583738331-778-width640height480_schema_article.jpg"
        alt="image 2"
        className="h-full w-full object-cover "
      />
      <img
        src="https://pgdphurieng.edu.vn/wp-content/uploads/2023/04/content_hinh-hoc-lop-1-gom-nhung-kien-thuc-nao.jpg"
        alt="image 3"
        className="h-{200px} w-full object-cover"
      />
      </Carousel>:<Carousel className='rounded-xl w-1/2 slider_img mx-auto'>
      <img
        src="https://s1.giaoanketnoitrithuc.com/ht8ctp5ueixt2wfz/thumb/2022/08/20/bai-giang-tu-nhien-va-xa-hoi-lop-1-sach-ket-noi-tri-thuc-voi_KkRia2iK7e.jpg"
        alt="image 1"
        className="h-{510px} w-full object-cover"
      />
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA9dsS1J9K0w2g_W3kClEup_lT3wNhNl80Ow&usqp=CAU"
        alt="image 2"
        className="h-full w-full object-cover "
      />
      <img
        src="https://o.rada.vn/data/image/2022/08/17/Tu-nhien-xa-hoi-2-700.jpg"
        alt="image 3"
        className="h-{200px} w-full object-cover"
      />
      </Carousel>}
    
    </div>
  )
}
