import React from 'react'

const Newsitem =(props)=> {
        let { title, description, imageurl, newsurl, author, date,source} = props;
        return (
            <div className='container'>
                <div className="card my-3" style={{ width: "18rem" }}>
                    <img src={imageurl ? imageurl : "https://www.shutterstock.com/shutterstock/photos/1932042689/display_1500/stock-photo-businessman-using-mobile-smart-phone-business-global-internet-connection-application-technology-1932042689.jpg"} style={{ height: "10rem" }} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...<span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"80%",zIndex:"1"}}>{source}<span class="visually-hidden">unread messages</span>
                        </span></h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "unknown"} on <br />{new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-primary btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
}
export default Newsitem;