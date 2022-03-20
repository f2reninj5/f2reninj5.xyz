
module.exports = class BlogPost {

    constructor(rows) {

        this.id = rows[0].id

        this.title = rows[0].title
        this.subtitle = rows[0].subtitle
        this.content = rows[0].content

        this.tags = rows.map(row => {
            
            return (row.tag_id ? { id: row.tag_id, name: row.tag_name } : null)
        })

        this.meta = {

            views: rows[0].views,
            createdAt: rows[0].created_at,

            get formattedCreatedAt() {

                return `${this.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${this.createdAt.toLocaleDateString()}`
            }
        }
    }

    get formattedTags() {

        return this.tags.map(tag => (tag ? `#${tag.name}` : '')).join(', ')
    }
}