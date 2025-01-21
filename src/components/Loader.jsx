

import { lineSpinner } from 'ldrs'



function Loader() {
    lineSpinner.register()
  return <l-line-spinner
  size="40"
  stroke="3"
  speed="1" 
  color="blue" 
></l-line-spinner>
}

export default Loader