import { useState } from 'react';

function NewEntryForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <form>
      <p>
        <label htmlFor="entry-title">Title</label>
        <br />
        <input
          id="entry-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </p>
      <p>
        <label htmlFor="entry-content">Content</label>
        <br />
        <textarea
          id="entry-content"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </p>
    </form>
  );
}

const tags = tagsInput
  .split(',')
  .map((t) => t.trim().toLowerCase())
  .filter((t) => t !== '')

onAddEntry(title.trim(), content.trim(), mood, tags)

export default NewEntryForm;