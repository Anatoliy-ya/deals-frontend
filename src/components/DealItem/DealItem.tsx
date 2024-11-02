import { Deal } from '../../types/types';
import { translateStatus } from '../../utils/translateStatus';

type DealItemProps = {
  deal: Deal;
};

const DealItem: React.FC<DealItemProps> = (props) => {
  return (
    <tr key={props.deal.id}>
      <td>{props.deal.id}</td>
      <td>{props.deal.title}</td>
      <td>{translateStatus(props.deal.status)}</td>
      <td>{props.deal.createdAt}</td>
    </tr>
  );
};

export default DealItem;
