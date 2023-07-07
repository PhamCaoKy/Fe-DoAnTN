import { Progress, Typography } from "@material-tailwind/react";
 interface Props {
  percent: number 
 }
export default function ProgressLesson(props:Props) {
 const {percent}= props
 const percentFix = (percent*100).toFixed()
  return (
    <div className="w-3/4 mt-10 ml-10 mb-5">
      <div className="flex items-center justify-between gap-4 mb-2">
        <Typography color="green" variant="h6">Hoàn thành</Typography>
        <Typography color="green" variant="h6">{`${percentFix}%`}</Typography>
      </div>
      <Progress color="green" value={Number(percentFix)} />
      <Typography color="red" variant="h5" className='mt-10' >Bé phải vượt qua bài kiểm tra(trên 80 điểm) mới tính là hoàn thành bài học nhé</Typography>
    </div>
  );
}