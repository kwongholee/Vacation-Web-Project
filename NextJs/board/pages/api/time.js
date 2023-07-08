export default function Time(req, res) {
  let time = new Date();
  return res.status(200).json(time)
}