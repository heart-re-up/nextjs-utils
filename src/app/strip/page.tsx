"use client";

import { useEffect, useState } from "react";
import extractTextFromHTML from "@/lib/regex/extractTextFromHTML";

const html = `
<div class="content">
  <h2>제목입니다</h2>
  <p>본문 내용입니다. 특정 문자열을 추출하고 싶습니다.</p>
  <ul>
    <li>목록 1</li>
    <li>목록 2</li>
  </ul>
</div>`;

export default function Page() {
  const [text, setText] = useState("");
  useEffect(() => {
    setText(extractTextFromHTML(html));
  }, []);
  return <div>{text}</div>;
}
