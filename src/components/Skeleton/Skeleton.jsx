import css from './Skeleton.module.css';

const simulateIndex = [...Array(12).keys()];

export const Skeleton = () => <ul className={css.skull}> {
    simulateIndex.map((i, index) => <li  className={css.skullLi} key={index}>{}</li>)}
</ul>;