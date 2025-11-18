import React from "react";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);
    
    // Initialize state based on whether we're editing or not
    if (props.editingNote) {
      this.state = {
        title: props.editingNote.title,
        body: props.editingNote.body,
        charCount: 50 - props.editingNote.title.length,
      };
    } else {
      this.state = {
        title: "",
        body: "",
        charCount: 50,
      };
    }
    
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Check if we've switched to editing mode or switched between different notes
    if (this.props.editingNote && 
        (!prevProps.editingNote || 
         this.props.editingNote.id !== prevProps.editingNote.id)) {
      this.setState({
        title: this.props.editingNote.title,
        body: this.props.editingNote.body,
        charCount: 50 - this.props.editingNote.title.length,
      });
    }
    
    // Reset form when switching from edit to add mode
    if (!this.props.editingNote && prevProps.editingNote) {
      this.setState({
        title: "",
        body: "",
        charCount: 50,
      });
    }
  }

  handleTitleChange(event) {
    const title = event.target.value;
    const charCount = 50 - title.length;
    
    this.setState({
      title: title,
      charCount: charCount >= 0 ? charCount : 0,
    });
  }

  handleBodyChange(event) {
    this.setState({
      body: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    if (this.state.title.trim() && this.state.body.trim()) {
      if (this.props.editingNote) {
        // Editing existing note
        this.props.onEditNote({
          id: this.props.editingNote.id,
          title: this.state.title,
          body: this.state.body,
        });
      } else {
        // Creating new note
        this.props.onAddNote({
          title: this.state.title,
          body: this.state.body,
        });
        
        // Reset form only when adding new note
        this.setState({
          title: "",
          body: "",
          charCount: 50,
        });
      }
    }
  }

  handleCancel(event) {
    event.preventDefault();
    if (this.props.onCancelEdit) {
      this.props.onCancelEdit();
    }
  }

  render() {
    const isEditing = !!this.props.editingNote;
    const isLoading = this.props.loading;
    
    return (
      <div className="card-note-input">
        <div className="note-input">
          <h2 className="note-input-title">{isEditing ? "Edit Note" : "Add a New Note"}</h2>

          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="note-input-field"
              placeholder="Note Title"
              value={this.state.title}
              onChange={this.handleTitleChange}
              maxLength="50"
              disabled={isLoading}
            />
            <p className="character-count">Character Remaining: {this.state.charCount}</p>

            <textarea
              className="note-input-content"
              placeholder="Note Body"
              value={this.state.body}
              onChange={this.handleBodyChange}
              disabled={isLoading}
            ></textarea>

            <div className="note-input-buttons">
              {(isEditing || this.props.onCancelEdit) && (
                <button 
                  type="button" 
                  className="cancel-edit-btn"
                  onClick={this.handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              )}
              <button type="submit" className="save-note-btn" disabled={isLoading}>
                {isLoading ? "Saving..." : (isEditing ? "Update Note" : "Save Note")}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NoteInput;