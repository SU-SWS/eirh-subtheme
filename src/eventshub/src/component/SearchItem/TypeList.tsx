import { Paragraph } from '../Typography';

interface TypeListProps {
  items: string[];
}

const TypeList: React.FC<TypeListProps> = ({ items }) => {
  return <Paragraph>{items.join(', ')}</Paragraph>;
};

export default TypeList;