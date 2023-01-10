export function prepareTooltipMessage(array, username, likes, ownLiked){
  console.log("ARRAY",array)
  if(!array) return ''
  const usernames = array.map((u) => u.username);

  if(ownLiked){
    if(likes >= 4){
      const usernamesFiltred = array.filter((u) => u.username !== username);
      const message = `Você, ${usernamesFiltred[0]}, ${usernamesFiltred[1]}, e mais ${likes - 3} pessoas curtiram isso!}`
      return message;
    } 

    if(likes == 3){
      const usernamesFiltred = array.filter((u) => u.username !== username);
      const message = `Você, ${usernamesFiltred[0]}, ${usernamesFiltred[1]}, curtiram isso!}`
      return message;
    }

    if(likes == 2){
      const usernamesFiltred = array.filter((u) => u.username !== username);
      const message = `Você e ${usernamesFiltred[0]}, curtiram isso!}`
      return message;
    }

    if(likes == 1){
      const message = `Você curtiu isso!}`
      return message;
    }
  }

  if(likes >= 4){
    const message = `${usernames[0]},  ${usernames[1]}, ${usernames[2]} e mais ${likes - 3} pessoas curtiram isso!`
    return message;
  }
  if(likes == 3){
    const message = `${usernames[0]},  ${usernames[1]}, ${usernames[2]}, curtiram isso!`
    return message;
  }
  if(likes == 2){
    const message = `${usernames[0]},  ${usernames[1]}, curtiram isso!`
    return message;
  }
  if(likes == 1){
    const message = `${usernames[0]}, curtiu isso!`
    return message;
  }
  if(likes == 0){
    const message = `Por enquanto nenhum like!`
    return message;
  }
}
