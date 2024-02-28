import React from 'react';

interface SearchFacetProps {
  label: string;
  facetValues: Record<string, number>;
  attribute: string;
  selectedOptions: string[];
  onChange: (values: string[]) => void;
  optionClasses?: string;
  exclude?: string[];
}

const SearchFacet: React.FC<SearchFacetProps> = ({
  label,
  facetValues,
  attribute,
  selectedOptions,
  onChange,
  exclude = [],
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values: string[] = [];
    const checkboxes = document.getElementsByName(e.target.name) as NodeListOf<HTMLInputElement>;

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        values.push(checkbox.value);
      }
    });

    onChange(values);
  };

  let preparedFacetValues = Object.keys(facetValues).map((value) => {
    if (exclude.includes(value)) {
      return null;
    }
    return {
      name: value,
      count: facetValues[value],
    };
  });

  preparedFacetValues = preparedFacetValues.filter((el) => el !== null);
  if (preparedFacetValues.length === 0) {
    return null;
  }

  return (
    <div>
      <h3>{label}</h3>
      {preparedFacetValues.map((option) => (
        <label key={option!.name}>
          <input
            type="checkbox"
            value={option!.name}
            name={attribute}
            defaultChecked={selectedOptions.includes(option!.name)}
            onChange={(e) => handleCheckboxChange(e)}
          />
          <span>
            {option!.name} ({option!.count.toLocaleString('en-us')})
          </span>
        </label>
      ))}
    </div>
  );
};

export default SearchFacet;
