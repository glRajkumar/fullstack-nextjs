type props = { wrapperCls?: string, loaderCls?: string }

function Loader({ wrapperCls = '', loaderCls = '' }: props) {
  return (
    <div className={`dc ${wrapperCls}`}>
      <div className={`loader ${loaderCls} `}></div>
    </div>
  )
}

export default Loader