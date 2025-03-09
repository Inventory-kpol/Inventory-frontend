import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Mypage_header";

const Column = () => {
  const navigate = useNavigate(); // 네비게이션 사용 가능

  // 예제 데이터 (서버에서 불러온다고 가정)
  const data = {
    title: "Inventoriess",
    subtitle: "ColumnTitle",
    createdAt: "2024.01.21",
    updatedAt: "2024.01.21",
    content:
      "dmgpgdmgpgdmgpgpgpgpgpgpawdawdawddwadwadwadwsssadasd asasd...",
    comments: [
      { id: 1, text: "정곤", position: { top: "-10px", right: "-20px" } },
      { id: 2, text: "정곤", position: { top: "50%", right: "10px" } },
      { id: 3, text: "정곤", position: { bottom: "-10px", right: "-10px" } },
    ],
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col">
      {/* 헤더 */}
      <Header />
      <div className="flex items-center justify-between border-b pb-2 px-4 bg-gray-800 text-white h-12">
        <h1 className="text-lg font-semibold">Inventories</h1>
        <span className="text-sm">username</span>
      </div>

      {/* 본문 */}
      <div className="flex flex-col items-center p-6">
        <h2 className="text-6xl font-bold text-black">{data.title}</h2>
        <h3 className="text-5xl mb-2 text-black">{data.subtitle}</h3>
        <hr className="w-3/4 my-4 border-black" />
        <p className="text-sm text-gray-500">
          create at {data.createdAt} | update at {data.updatedAt}
        </p>
        <p className="mt-4 text-gray-700 text-center max-w-2xl">{data.content}</p>

        {/* 이미지 박스 */}
        <div className="w-3/4 h-48 bg-gray-300 mt-6 relative flex items-center justify-center">
          <span className="text-gray-500">이미지 영역</span>
          {data.comments.map((comment) => (
            <span
              key={comment.id}
              className="absolute bg-blue-500 text-white px-2 py-1 rounded-full text-xs"
              style={comment.position}
            >
              {comment.text}
            </span>
          ))}
        </div>

        {/* 해시태그 */}
        <p className="text-gray-500 mt-2 text-sm"># 백엔드 # 어려워 ㅠㅠ</p>
      </div>
    </div>
  );
};

export default Column;
 