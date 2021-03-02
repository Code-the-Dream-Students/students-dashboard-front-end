import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ text, setText }) => {
    return (
        <ReactQuill
            value={text}
            onChange={setText}
        />
    );
};

export default TextEditor;
