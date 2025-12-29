import Editor from "@monaco-editor/react";

export default function SqlEditor({ value, onChange }) {
  return (
    <Editor
      height="200px"
      defaultLanguage="sql"
      value={value}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: "on",
      }}
    />
  );
}
