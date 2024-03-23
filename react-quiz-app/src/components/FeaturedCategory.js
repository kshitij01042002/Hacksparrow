const FeaturedCategory = ({imgSrc, categoryName}) => {
  return (
    <div className="category br-sm">
      <img src={imgSrc} alt={categoryName} className="img-responsive" />
      <h3 className="text-center pd-sm category-title">{categoryName}</h3>
    </div>
  );
};

export {FeaturedCategory};
