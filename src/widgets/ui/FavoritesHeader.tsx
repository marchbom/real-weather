import { Link } from "react-router";

export default function FavoritesHeader() {
  return (
    <div className="md:mt-24">
      <div className="flex justify-between text-white">
        <p className="text-h3 font-semibold">즐겨찾기</p>
        <div className="flex gap-[13px] text-h5 font-medium items-center">
          <Link to="/favorites/edit" type="button" className="cursor-pointer">
            편집
          </Link>
          <Link to="/favorites/add" className="cursor-pointer">
            추가
          </Link>
        </div>
      </div>
    </div>
  );
}
