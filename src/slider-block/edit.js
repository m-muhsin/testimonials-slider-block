const { MediaUpload, PlainText } = wp.editor;

export default function Edit(props) {

    const { testimonials } = props.attributes;

    if (!props.attributes.id) {
        const id = `testimonial${Math.floor(Math.random() * 100)}`;
        props.setAttributes({
            id,
        });
    }

    const testimonialsList = testimonials
        .sort((a, b) => a.index - b.index)
        .map((testimonial) => {
            return (
                <div className="gts-testimonial-block">
                    <p>
                        <span>
                            Insert Testmonial {Number(testimonial.index) + 1} Here:
                        </span>
                        <span
                            className="remove-testimonial"
                            onClick={() => {
                                const newTestimonials = testimonials
                                    .filter((item) => item.index != testimonial.index)
                                    .map((t) => {
                                        if (t.index > testimonial.index) {
                                            t.index -= 1;
                                        }

                                        return t;
                                    });

                                props.setAttributes({
                                    testimonials: newTestimonials,
                                });
                            }}
                        >
                            <i className="fa fa-times" />
                        </span>
                    </p>
                    <blockquote className="wp-block-quote">
                        {/* <label>Content:</label> */}
                        <PlainText
                            className="content-plain-text"
                            style={{ height: 58 }}
                            placeholder="Testimonial Text"
                            value={testimonial.content}
                            autoFocus
                            onChange={(content) => {
                                const newObject = Object.assign({}, testimonial, {
                                    content: content,
                                });
                                props.setAttributes({
                                    testimonials: [
                                        ...testimonials.filter(
                                            (item) => item.index != testimonial.index
                                        ),
                                        newObject,
                                    ],
                                });
                            }}
                        />
                        <div className="row">
                            <div className="gts__picture col-3">
                                <MediaUpload
                                    onSelect={(media) => {
                                        const image = media.sizes.medium
                                            ? media.sizes.medium.url
                                            : media.url;
                                        const newObject = Object.assign({}, testimonial, {
                                            image: image,
                                        });
                                        props.setAttributes({
                                            testimonials: [
                                                ...testimonials.filter(
                                                    (item) => item.index != testimonial.index
                                                ),
                                                newObject,
                                            ],
                                        });
                                    }}
                                    type="image"
                                    value={testimonial.image}
                                    render={({ open }) =>
                                        !!testimonial.image ? (
                                            <div>
                                                {props.isSelected && (
                                                    <div className="gts__picture__actions">
                                                        <a
                                                            href="#"
                                                            onClick={() => {
                                                                const newObject = Object.assign(
                                                                    {},
                                                                    testimonial,
                                                                    {
                                                                        image: null,
                                                                    }
                                                                );
                                                                props.setAttributes({
                                                                    testimonials: [
                                                                        ...testimonials.filter(
                                                                            (item) =>
                                                                                item.index != testimonial.index
                                                                        ),
                                                                        newObject,
                                                                    ],
                                                                });
                                                            }}
                                                        >
                                                            × Remove
                                                        </a>
                                                    </div>
                                                )}

                                                <div
                                                    className="gts__picture__image"
                                                    style={{
                                                        backgroundImage: `url(${testimonial.image})`,
                                                    }}
                                                    onClick={open}
                                                />
                                            </div>
                                        ) : (
                                                <a
                                                    href="#"
                                                    className="gts__picture__image"
                                                    onClick={open}
                                                >
                                                    Select Image
                                                </a>
                                            )
                                    }
                                />
                            </div>
                            <div className="col-9 mt-3">
                                <PlainText
                                    className="author-plain-text"
                                    placeholder="Author"
                                    value={testimonial.author}
                                    onChange={(author) => {
                                        const newObject = Object.assign({}, testimonial, {
                                            author: author,
                                        });
                                        props.setAttributes({
                                            testimonials: [
                                                ...testimonials.filter(
                                                    (item) => item.index != testimonial.index
                                                ),
                                                newObject,
                                            ],
                                        });
                                    }}
                                />
                                {/* <label>Link:</label> */}
                                <PlainText
                                    className="link-plain-text"
                                    placeholder="Link to Author Profile"
                                    value={testimonial.link}
                                    onChange={(link) => {
                                        const newObject = Object.assign({}, testimonial, {
                                            link: link,
                                        });
                                        props.setAttributes({
                                            testimonials: [
                                                ...testimonials.filter(
                                                    (item) => item.index != testimonial.index
                                                ),
                                                newObject,
                                            ],
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </blockquote>
                </div>
            );
        });
    return (
        <div className={props.className}>
            {testimonialsList}
            <button
                className="add-more-testimonial"
                onClick={(content) =>
                    props.setAttributes({
                        testimonials: [
                            ...props.attributes.testimonials,
                            {
                                index: props.attributes.testimonials.length,
                                content: "",
                                author: "",
                                link: "",
                            },
                        ],
                    })
                }
            >
                +
            </button>
        </div>
    );
}