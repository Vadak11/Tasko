import '@dotlottie/player-component';

// eslint-disable-next-line react/prop-types
export const Lottie = ({src}) => {
    return (
        <>
            <dotlottie-player
                src={src}
                autoplay
                loop
                style={{height: '150px', width: '150px'}}
            />
        </>
    )
}