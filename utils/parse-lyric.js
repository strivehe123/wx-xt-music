// export function parseLyric(lyricString){
//   const lyricReg=/\[(\d{2}):(\d{2})\.(\d{2,3})\]/
//   const lyricSplits=lyricString.split('\n')
//   const lyricInfos=[]
//   for(const lyric of lyricSplits){
//     const result=lyricReg.exec(lyric)
//     if(!result) return 
//     const min=result[1]*60*1000
//     const sec=result[2]*1000
//     const minsec=result[3]
//     const time=minsec+sec+min
//     const content=lyric.replace(lyricReg,'')

//     lyricInfos.push({time,content})
//     console.log(lyricInfos)
//   }
//   console.log(lyricInfos)
//   return lyricInfos
// }
export function parseLyric(lyric_str){
  const lyric_line_arr = lyric_str.split('\n')
        const time_reg =/\[(\d{2}):(\d{2})\.(\d{2,3})\]/i
        const lyric_infos = []
        for (let lyric_line of lyric_line_arr) {
            
            const result = lyric_line.match(time_reg)
            
            if (!result) continue
            const minute = result[1] * 60 * 1000
            const second = result[2] * 1000
            const min_second=result[3].length===2?result[3]*10:result[3]*1
            const time = minute + second+min_second
            const content = lyric_line.replace(time_reg, '')
            lyric_infos.push({
                time,
                content
            })
        }
        
       return lyric_infos
}