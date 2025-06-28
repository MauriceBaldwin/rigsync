import { useParams } from "react-router";


const MainCanopy = () => {
  const { mainCanopyId } = useParams();

  return (
    <p>View main canopy with id {mainCanopyId}</p>
  );
};

export default MainCanopy;