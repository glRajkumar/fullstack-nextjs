
function Loader({ wrapperCls = '', loaderCls = '' }) {
  return (
    <div className={`dc ${wrapperCls}`}>
      <div className={`loader ${loaderCls} `}></div>
    </div>
  )
}

export default Loader