import { useNavigate } from 'react-router-dom';
import { Deal } from '../../types/types';
import { formatDateString } from '../../utils/dateUtils';
import { translateStatus } from '../../utils/translateStatus';

type DealItemProps = {
  deal: Deal;
};

const DealItem: React.FC<DealItemProps> = (props) => {
  const navigate = useNavigate();

  const handleClickDeal = () => {
    navigate(`/deals/${props.deal.id}`);
  };
  return (
    <tr key={props.deal.id} onClick={handleClickDeal}>
      <td>{props.deal.id}</td>
      <td>{props.deal.title}</td>
      <td>{translateStatus(props.deal.status)}</td>
      <td>{formatDateString(props.deal.createdAt)}</td>
    </tr>
  );
};

export default DealItem;
