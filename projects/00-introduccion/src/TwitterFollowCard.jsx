import './TwitterFollorCard.css'
import { useState } from 'react'
// eslint-disable-next-line react/prop-types
function TwitterFollorCard({ userName, name }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing
        ? 'tw-followCard-button is-following'
        : 'tw-followCard-button'

    const hadleClick = () => {
        setIsFollowing(!isFollowing)
    }

    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img src={`https://unavatar.io/github/${userName}`} alt="avatar de miguel" className='tw-follorCard-avatar' />
                <div className='tw-followCard-info'>
                    <strong>{name}</strong>
                    <span className='tw-followCard-info-UserName'>@{userName}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={hadleClick}>{text}</button>
            </aside>
        </article>
    )
}

export default TwitterFollorCard 