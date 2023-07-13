// propsの型定義
type TotalAndSpinCountProps = {
    total: number;
    spinCount: number;
  };
  
  const TotalAndSpinCount: React.FC<TotalAndSpinCountProps> = ({ total, spinCount }) => {
    return (
      <div className="totalAndSpinCount">
        <span>Total: {total}</span>
        <span> / Spin: {spinCount}</span>
      </div>
    );
  };
  
  export default TotalAndSpinCount;