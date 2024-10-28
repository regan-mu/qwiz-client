import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const QuestionField: React.FC<{
  placeholder: string;
  question: string;
  handleQuestionText: (value: string) => void;
}> = ({ placeholder, question, handleQuestionText }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder,
    }),
    [placeholder]
  );

  return (
    <JoditEditor
      ref={editor}
      value={question}
      config={config}
      // tabIndex={1} // tabIndex of textarea
      onChange={(newContent) => {handleQuestionText(newContent)}}
    />
  );
};

export default QuestionField;
